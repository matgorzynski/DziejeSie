﻿using DziejeSieApp.DataBaseContext;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DziejeSieApp.Controllers
{
    
    public class EventController : Controller
    {
        private readonly DziejeSieContext _dbcontext;

        public EventController(DziejeSieContext dbcontext)
        {
            _dbcontext = dbcontext;
        }

        [Route("event/all")]
        [HttpGet]
        public JsonResult AllEvent()
        {
            return Json(_dbcontext.Event.ToList());

        }

    }
}