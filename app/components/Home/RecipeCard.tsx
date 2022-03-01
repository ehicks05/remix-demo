import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FcClock } from "react-icons/fc";
import { IRecipe } from "~/types/types";
import Card from "../Card";
import FavoriteButton from "../FavoriteButton";
import T from "../T";
import { UserContext } from "~/contexts/UserContext";

interface IRecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({
  recipe: { id, emoji, name, author, description, cookingTime },
}: IRecipeCardProps) {
  const { user, favoriteIds, fetchFavoriteIds } = useContext(UserContext);

  return (
    <Link to={`/recipes/${id}`}>
      <Card className="hover:shadow-2xl transform transition-all hover:scale-105">
        <div className="flex flex-col gap-4 h-56">
          <div className="flex gap-2">
            <figure className="w-16 h-16 text-5xl pt-2">{emoji}</figure>
            <div className="w-full">
              <div className="font-semibold dark:text-neutral-200">{name}</div>
              <div className="text-xs italic dark:text-neutral-200">
                {author.displayName}
              </div>
            </div>
          </div>

          <T className="line-clamp-5">{description}</T>
        </div>

        <footer className="flex pt-4 border-t border-opacity-25">
          <div className="flex gap-2 justify-center items-center w-full">
            <div>
              <FcClock size="2em" />
            </div>
            <div className="font-semibold dark:text-neutral-200">
              {cookingTime}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center w-full">
            {user && (
              <div onClick={(e) => e.preventDefault()}>
                <FavoriteButton
                  recipeId={id}
                  favoriteIds={favoriteIds}
                  fetchFavorites={fetchFavoriteIds}
                />
              </div>
            )}
          </div>
        </footer>
      </Card>
    </Link>
  );
}

export default RecipeCard;
