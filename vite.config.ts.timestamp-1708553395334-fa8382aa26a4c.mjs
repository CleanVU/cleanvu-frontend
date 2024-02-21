// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/jacoblurie/Git/College/Spring_2024/CleanVU/cleanvu-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///Users/jacoblurie/Git/College/Spring_2024/CleanVU/cleanvu-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    define: {
      // https://github.com/vitejs/vite/issues/1973#issuecomment-815695512
      "process.env": process.env
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamFjb2JsdXJpZS9HaXQvQ29sbGVnZS9TcHJpbmdfMjAyNC9DbGVhblZVL2NsZWFudnUtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qYWNvYmx1cmllL0dpdC9Db2xsZWdlL1NwcmluZ18yMDI0L0NsZWFuVlUvY2xlYW52dS1mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvamFjb2JsdXJpZS9HaXQvQ29sbGVnZS9TcHJpbmdfMjAyNC9DbGVhblZVL2NsZWFudnUtZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XG4gIC8vIExvYWQgYXBwLWxldmVsIGVudiB2YXJzIHRvIG5vZGUtbGV2ZWwgZW52IHZhcnMuXG4gIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcwNzA5OTg3L2hvdy10by1sb2FkLWVudmlyb25tZW50LXZhcmlhYmxlcy1mcm9tLWVudi1maWxlLXVzaW5nLXZpdGVcbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIH07XG5cbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIGRlZmluZToge1xuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy8xOTczI2lzc3VlY29tbWVudC04MTU2OTU1MTJcbiAgICAgIFwicHJvY2Vzcy5lbnZcIjogcHJvY2Vzcy5lbnYsXG4gICAgfSxcbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3WCxTQUFTLGNBQWMsZUFBZTtBQUM5WixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBRzNCLFVBQVEsTUFBTSxFQUFFLEdBQUcsUUFBUSxLQUFLLEdBQUcsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFFaEUsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFFBQVE7QUFBQTtBQUFBLE1BRU4sZUFBZSxRQUFRO0FBQUEsSUFDekI7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
