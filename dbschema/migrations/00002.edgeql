CREATE MIGRATION m17aytsmoxmgcdfy2bp3ojvuv4otrl47df7dugibocosb435emy2vq
    ONTO m1pyzgppu24yu5hw3ahdbl6ficlirk7nkyxt6vmjuodxbcwmbb64ja
{
  ALTER TYPE default::User {
      ALTER PROPERTY displyName {
          RENAME TO displayName;
      };
  };
};
