using MyNewSitecoreApplication.Models;
using NSubstitute;
using Sitecore.FakeDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace SiteCoreTests
{
    public class ExampleControllerShould
    {
        [Fact]
        public void ReturnAValidName()
        {
            var calculatorRef = Substitute.For<ICalculator>();
            calculatorRef.Add(1, 2).Returns(3);
            Assert.Equal(3, calculatorRef.Add(1, 2));
        }
    }
}
