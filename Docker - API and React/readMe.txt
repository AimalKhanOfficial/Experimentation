Basic Steps:

[1] - Create a basic directory
[2] - Create a react app with create-react-app
[3] - Add a new .Net Core Web API with docker support
[4] - Copy/Paste the code that is in Web API's dockerfile
[5] - If you face this error, 

-------------------------------
/usr/share/dotnet/sdk/2.1.502/Sdks/Microsoft.NET.Sdk/targets/Microsoft.PackageDependencyResolution.targets(198,5): error NETSDK1004: Assets file '/src/WebAPI/C:/Users/Aimal Khan/Desktop/Docker - API and React/WebAPI/WebAPI/obj/project.assets.json' not found. Run a NuGet package restore to generate this file. [/src/WebAPI/WebAPI.csproj]

Build FAILED.
-------------------------------

open the nuget console manager and run "dotnet restore <projName>/<projName>.csproj", do a "docker-compose up --build" again and that should fix the prob
