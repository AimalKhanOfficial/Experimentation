using MyNewSitecoreApplication.Models;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Web.UI.WebControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MyNewSitecoreApplication.Controllers
{
    public class ColorsController : Controller
    {
        [HttpGet]
        // GET: Colors
        public ActionResult Index()
        {
            //var item = RenderingContext.Current.ContextItem;
            //var listOfColors = new HtmlString(FieldRenderer.Render(item, "Color"));
            var dataSourceId = RenderingContext.Current.Rendering.DataSource;
            var dataSource = Sitecore.Context.Database.GetItem(dataSourceId);
            var viewModel = new ColorContainer();
            viewModel.Colors = new List<Item>();
            viewModel.Colors = dataSource.Children;
            return View(viewModel);
        }
    }
}