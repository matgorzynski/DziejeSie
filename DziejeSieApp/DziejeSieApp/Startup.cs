using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DziejeSieApp.DataBaseContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
            //var connection = @"Server=mssql2.webio.pl,2401;Database=matgorzynski_DziejeSieApp_dev;Uid=matgorzynski_DziejeSieApp;Password=zaq1@WSX;";

            //localhost database
            var connection = @"Server=RAFCIO\DZIEJESIE;Database=dziejesie;Uid=dev;Password=dev;";
#else
            var connection = @"Server=mssql2.webio.pl,2401;Database=matgorzynski_DziejeSieApp;Uid=matgorzynski_DziejeSieApp;Password=zaq1@WSX;";
#endif

            services.AddMvc()
                .AddMvcOptions(o => o.OutputFormatters.Add(
                    new XmlDataContractSerializerOutputFormatter()));

            services.AddDbContext<DziejeSieContext>
                (options => options.UseSqlServer(connection));

            services.AddSession(o =>
            {
                o.Cookie.Name = ".DziejeSie.Session";
                o.IdleTimeout = TimeSpan.FromMinutes(600); //po 10 godzinach nieaktywności sesja po stronie serwera umiera [*]
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            { 
                app.UseDeveloperExceptionPage();
            }

            app.UseSession(); //sesje
            app.UseMvc();
           
            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }
    }
}