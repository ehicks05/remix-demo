CREATE MIGRATION m15gnsmpari4vhpl7bdayxcg5ydwwz4oavkltpvat77u6s6yvggjca
    ONTO m1d2zyy53y5zfegbiv6nblmc2iotnzg5okqpprtxgxgd53vhv2d4za
{
  ALTER TYPE default::Recipe {
      CREATE REQUIRED PROPERTY createdAt -> std::datetime {
          SET REQUIRED USING (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY updatedAt -> std::datetime {
          SET REQUIRED USING (std::datetime_current());
      };
  };
};
