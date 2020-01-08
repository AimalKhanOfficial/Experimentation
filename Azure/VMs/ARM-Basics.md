* start with {} structure and a deployment "Schema" variable  
* Schema variable validates the arm structure: Tells ARM how to validate this structure of the template that is asked to deploy
* ContentVersion {}: its metadata. Only meant for developer!   Does not impact developer  
* parameters {}:  
    * ARM cannot work this out on a fly. i.e. put the name of a VM here.  
    * every param needs to have a "type" variable i.e. "x": {type:"string"}   
    * a "defaultValue" can also be set for each param  
    * the "allowedValues" is an array variable that checks from a set of values  
    * there's also a "metadata" variable to make your own code readable  
    * an example inside param: "adminUsername" : {"value": "xyz"}  
    * "count": {"type": "int", "defaultValue": 4}
* variables {}: 
    * ARM can work this out on a fly  
    * an example: "vnetID": "[resourceId('Microsoft.Network/virtualNetworks', parameters('virtualName'))]"
* resources []: 
    * an array to deploy multiple resources  
    * has objects inside this array i.e. {"type": "", "name": "", "apiVersion": "", "location": "", "properties": {"accountType": ""}}
    * Want to deploy multiple resources of the same type? pass a "count" variable to the main properties param "outside this resources variable". In this case, you need to use to have a workAround for the "name" variable as azure will try to create all the VMs with the same name. use "[concat('xyz', '-', copyIndex()))]" for the name. Also use the "copy" object i.e. "copy": {"name": "xyz", "count": "[parameters('count')]"}. These variables needs to be part of the "resource" section 
* outputs {}: output certain data to powershell or pass it on to another process, this section is used  