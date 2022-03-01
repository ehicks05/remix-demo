import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import RecipePicker from "~/components/Home/RecipePicker";

import e from "../../dbschema/edgeql-js";
import { client } from "../edgedb.server";

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async () => {
  const query = e.select(e.Recipe, (recipe) => ({
    id: true,
    name: true,
    emoji: true,
    description: true,
    totalTime: true,
    difficulty: true,
    servings: true,
    course: true,
    createdAt: true,
    updatedAt: true,
    author: { auth_id: true, displayName: true },
    // ingredients: true,
    ingredients: { id: true, name: true, quantity: true, unit: true },
    test: e.count(recipe.ingredients),
    steps: { i: true, text: true },
    // filter: e.op(recipe.name, "ilike", "Chuck Stew"),
    order_by: {
      expression: recipe.createdAt,
      direction: e.DESC,
      empty: e.EMPTY_LAST,
    },
  }));
  const data = (await query.run(client)).map((r) => ({
    ...r,
    cookingTime: r.totalTime.minutes,
  }));

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData();

  return (
    <>
      <Hero title="Find a Recipe" />
      <Container>
        {/* <pre className="bg-white">{JSON.stringify(data, null, 2)}</pre> */}
        <RecipePicker recipes={data} />
      </Container>
    </>
  );
}
