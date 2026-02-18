import { defineConfig } from "prisma/config";

export default defineConfig({
  migrate: {
    datasourceUrl: "postgresql://postgres:123456@localhost:5432/festa_app",
  },
});
