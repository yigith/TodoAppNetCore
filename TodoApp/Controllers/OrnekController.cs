using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Controllers
{
    [Route("BirkacSehir")]
    [ApiController]
    public class OrnekController : ControllerBase
    {
        [HttpGet]
        public string[] Get()
        {
            return new[] { "Ankara", "İzmir", "Kars" };
        }
    }
}
