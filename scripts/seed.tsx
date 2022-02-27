import * as edgedb from "edgedb";
import e from "../dbschema/edgeql-js";
import recipes from "./recipes.json";

const client = edgedb.createClient();

const seed = async () => {
  console.log("seeding started");

  const insertUser = e.insert(e.User, {
    auth_id: e.uuid_generate_v1mc(),
    displayName: "adminGuy123",
  });
  await insertUser.run(client);

  const insertRecipes = recipes.map((r) => {
    const ingredients = r.ingredients.map((i) =>
      e.insert(e.Ingredient, {
        name: i.name,
        quantity: i.quantity,
        unit: i.unit,
      })
    );
    const steps = r.directions.map((i, index) =>
      e.insert(e.Step, {
        i: index,
        text: i.text,
      })
    );

    return e.insert(e.Recipe, {
      name: r.name,
      emoji: r.emoji,
      description: r.description || "no description found",
      totalTime: new edgedb.Duration(0, 0, 0, 0, 0, Number(r.cookingTime)),
      difficulty: Number(r.difficulty || 2),
      servings: Number(r.servings),
      course: r.course || "",
      author: e.set(insertUser),
      ingredients: e.set(...ingredients),
      steps: e.set(...steps),
    });
  });

  await Promise.all(
    insertRecipes.map((insertRecipe) => insertRecipe.run(client))
  );
  console.log("seeding finished");
};

seed();
