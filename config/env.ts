const envConfig = {
  NEXT_PUBLIC_API_ENDPOINT:
    process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8080/api/v1/',
};
export default envConfig;
