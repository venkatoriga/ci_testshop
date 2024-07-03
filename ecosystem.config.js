module.exports = {
  apps: [
    {
      name: 'StoreFront_Staging',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'development',
        },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: '../Storefront_Logs/err.log',
      out_file: '../Storefront_Logs/out.log',
      log_file: '../Storefront_Logs/combined.log',
      time: true,
      autorestart: true,
      merge_logs: true
       
    },
  ],
};


