CREATE MIGRATION m1d2zyy53y5zfegbiv6nblmc2iotnzg5okqpprtxgxgd53vhv2d4za
    ONTO m1pcr6givy4bmntnnum6ptfxyggfno4rnlfzlflq6t2zxgckh7h46q
{
  ALTER TYPE default::Recipe {
      ALTER LINK ingredients {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE default::Recipe {
      ALTER LINK steps {
          RESET OPTIONALITY;
      };
  };
};
