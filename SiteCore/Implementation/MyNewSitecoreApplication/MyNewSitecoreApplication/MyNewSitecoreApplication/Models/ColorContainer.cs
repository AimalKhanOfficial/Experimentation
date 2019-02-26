using Sitecore.Data.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyNewSitecoreApplication.Models
{
    public class ColorContainer
    {
        public IEnumerable<Item> Colors { get; set; }
    }
}