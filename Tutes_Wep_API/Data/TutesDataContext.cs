using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tutes_Wep_API.Models;

namespace Tutes_Wep_API.Data
{
    public class TutesDataContext:DbContext
    {
        public TutesDataContext(DbContextOptions<TutesDataContext> options) : base(options)
        {

        }

        public DbSet<Tutorial> Tutorials { get; set; }
    }
}
