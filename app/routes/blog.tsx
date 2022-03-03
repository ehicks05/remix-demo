import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import Container from "~/components/Container";
import Hero from "~/components/Hero";
import T from "~/components/T";

interface Data {
  blogs: {
    title: string;
    content: string;
  }[];
}

export let loader: LoaderFunction = async () => {
  const data: Data = {
    blogs: [
      { title: "Blog Entry 1", content: "blah blah" },
      { title: "Blog Entry 2", content: "more stuff" },
    ],
  };

  return json(data);
};

export default function Index() {
  const { blogs }: Data = useLoaderData();

  return (
    <>
      <Hero title="Blog Placeholder" />
      <Container>
        <div className="flex flex-col gap-4">
          {blogs.map(({ title, content }) => (
            <div>
              <div>
                <T className="text-xl">{title}</T>
              </div>
              <div>
                <T>{content}</T>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
