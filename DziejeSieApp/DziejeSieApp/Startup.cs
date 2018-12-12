using System;
using EntityFramework.DataBaseContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DziejeSieApp
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
#if DEBUG
            //dev database
            var connection = @"Server=mssql2.webio.pl,2401;Database=matgorzynski_DziejeSieApp_dev;Uid=matgorzynski_DziejeSieApp;Password=zaq1@WSX;";
#else
            var connection = @"Server=mssql2.webio.pl,2401;Database=matgorzynski_DziejeSieApp;Uid=matgorzynski_DziejeSieApp;Password=zaq1@WSX;";
#endif

            //services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            //{
            //    builder.AllowAnyOrigin()
            //           .AllowAnyMethod()
            //           .AllowAnyHeader();
            //}));

            services.AddCors();

            services.AddMvc()
                .AddMvcOptions(o => o.OutputFormatters.Add(
                    new XmlDataContractSerializerOutputFormatter()));

            services.AddDbContext<DziejeSieContext>(
                options => options.UseSqlServer(connection));

            //services.Configure<MvcOptions>(options =>
            //{
            //    options.Filters.Add(new CorsAuthorizationFilterFactory("MyPolicy"));
            //});

            //CORS
            //services.AddCors
            //    (options =>
            //{
            //    options.AddPolicy("AllowMyOrigin",
            //    builder => builder.WithOrigins());
            //});
        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyHeader().AllowCredentials());
            app.UseCors(
                options => options.AllowAnyOrigin().AllowAnyMethod()
                );

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            //app.UseCors("AllowMyOrigin");

            app.UseMvc();

            
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}