using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tutes_Wep_API.Data;
using Tutes_Wep_API.Models;

namespace Tutes_Wep_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TutorialsController : ControllerBase
    {
        private readonly TutesDataContext _context;

        public TutorialsController(TutesDataContext context)
        {
            _context = context;
        }

        // GET: api/Tutorials
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tutorial>>> GetTutorials()
        {
            return await _context.Tutorials.ToListAsync();
        }

        // GET: api/Tutorials/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tutorial>> GetTutorial(int id)
        {
            var tutorial = await _context.Tutorials.FindAsync(id);

            if (tutorial == null)
            {
                return NotFound();
            }

            return tutorial;
        }

        // PUT: api/Tutorials/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTutorial(int id, Tutorial tutorial)
        {
            if (id != tutorial.TutorialID)
            {
                return BadRequest();
            }

            _context.Entry(tutorial).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TutorialExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tutorials
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Tutorial>> PostTutorial(Tutorial tutorial)
        {
            _context.Tutorials.Add(tutorial);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTutorial", new { id = tutorial.TutorialID }, tutorial);
        }

        // DELETE: api/Tutorials/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tutorial>> DeleteTutorial(int id)
        {
            var tutorial = await _context.Tutorials.FindAsync(id);
            if (tutorial == null)
            {
                return NotFound();
            }

            _context.Tutorials.Remove(tutorial);
            await _context.SaveChangesAsync();

            return tutorial;
        }

        // Check the Existence of Tutorial using its ID.
        private bool TutorialExists(int id)
        {
            return _context.Tutorials.Any(e => e.TutorialID == id);
        }
    }
}
