import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

import e from "../../../dbschema/edgeql-js";
import Recipe from "~/components/Recipe/Recipe";
import { client } from "../../edgedb.server";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ params }) => {
  const query = e.select(e.Recipe, (recipe) => ({
    id: true,
    name: true,
    emoji: true,
    description: true,
    totalTime: true,
    difficulty: true,
    servings: true,
    course: true,
    author: { auth_id: true, displayName: true },
    // ingredients: true,
    ingredients: { id: true, name: true, quantity: true, unit: true },
    test: e.count(recipe.ingredients),
    steps: { i: true, text: true },
    filter: e.op(recipe.id, "=", e.uuid(params.recipeId!)),
  }));
  const data = await query.run(client);

  // https://remix.run/api/remix#json
  return json({
    ...data,
    directions: data?.steps,
    cookingTime: data?.totalTime.minutes,
  });
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData();

  return <Recipe recipe={data} />;
}
