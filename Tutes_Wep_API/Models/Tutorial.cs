using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Tutes_Wep_API.Models
{
    /// <summary>
    /// This class is represent the Tutorial Model
    /// </summary>
    public class Tutorial
    {
        // Primary Key of Tutorials Model
        [Key]
        public int TutorialID { get; set; }

        // Represent Tutorial Title
        [Required]
        [StringLength(200)]
        public string TutorialTitle { get; set; }

        // Represent Description of Tutorial
        [Required]
        [StringLength(1000)]
        public string Description { get; set; }

        // Represent Price of Tutorial
        [Required]
        public int Price { get; set; }

        // Generate Visual Tutorial Code For End User
        public string TutorialCode
        {
            get { return "TUTE000" + TutorialID; }
        }
    }
}
