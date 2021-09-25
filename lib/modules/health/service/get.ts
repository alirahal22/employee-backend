export const getHealthService = () => {
  return { status: 'OK', uptime: process.uptime() };
};
