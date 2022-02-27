module default {
  type Recipe {
    required property name -> str;
    required property emoji -> str;
    required property description -> str;
    required property totalTime -> duration;
    required property difficulty -> int16;
    required property servings -> int16;
    required property course -> str;

    required link author -> User;
    required multi link ingredients -> Ingredient;
    required multi link steps -> Step;
  }

  type User {
    required property auth_id -> uuid;
    required property displayName -> str;
  }

  type Ingredient {
    required property name -> str;
    required property quantity -> str;
    required property unit -> str;
  }

  type Step {
    required property i -> int16;
    required property text -> str;
  }
}