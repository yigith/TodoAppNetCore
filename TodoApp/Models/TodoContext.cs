using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<TodoItem> TodoItems { get; set; }

    }
}
