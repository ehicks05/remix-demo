CREATE MIGRATION m1pyzgppu24yu5hw3ahdbl6ficlirk7nkyxt6vmjuodxbcwmbb64ja
    ONTO initial
{
  CREATE TYPE default::Ingredient {
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY quantity -> std::str;
      CREATE REQUIRED PROPERTY unit -> std::str;
  };
  CREATE TYPE default::Step {
      CREATE REQUIRED PROPERTY i -> std::int16;
      CREATE REQUIRED PROPERTY text -> std::str;
  };
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY auth_id -> std::uuid;
      CREATE REQUIRED PROPERTY displyName -> std::str;
  };
  CREATE TYPE default::Recipe {
      CREATE REQUIRED MULTI LINK ingredients -> default::Ingredient;
      CREATE REQUIRED LINK author -> default::User;
      CREATE REQUIRED MULTI LINK steps -> default::Step;
      CREATE REQUIRED PROPERTY course -> std::str;
      CREATE REQUIRED PROPERTY description -> std::str;
      CREATE REQUIRED PROPERTY difficulty -> std::int16;
      CREATE REQUIRED PROPERTY emoji -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE REQUIRED PROPERTY servings -> std::int16;
      CREATE REQUIRED PROPERTY totalTime -> std::duration;
  };
};
