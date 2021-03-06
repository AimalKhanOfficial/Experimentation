Following are the commands that i tried out to create a VM using the Azure-CLI. To create a VM, there are other resources that needs to be created first. Here are they: a Resource-Group -> a Virtual Network (vNet) -> a Subnet -> a Public-IP -> a Nework Security Group (NSG) -> a Network Interface (NIC) -> AND finally a VM. (finish it up by opening a port)

Start with the login process thru:  
```az login```

List down the available subscriptions:  
```az account list -o table```

Set the subscription from a list of available subscription: (only required incase of multiple subS)  
```az account set --subscription "SubscriptionID"```

To view the selected subscription:  
```az account show```

Starting with the main process, create a resouce group by running:  
```az group create --name "DemoRS-Aimal" --location "centralus"```

List the available Resource Groups by:  
```az group list -o table```

Moving onto creation of a virtual network and a subnet, run:  
```az network vnet create --name "DemoVNet-Aimal" --resource-group "DemoRS-Aimal" --address-prefix "10.0.1.0/26" --subnet-name "DemoSubnet-Aimal" --subnet-prefix "10.0.1.0/27"```

**Note: The address prefix is in a CIDR (Classless internet domain routing) format** 

List all available vnets via:  
```az network vnet list -o table```

Creation of a public IP address:  
```az network public-ip create --name "DemoPublicIP-Aimal" --resource-group "DemoRS-Aimal"```

List all available public IPs via:  
```az network public-ip list -o table```

Creation of a NSG:  
```az network nsg create --name "DemoNSG-Aimal" --resource-group "DemoRS-Aimal"```

List all available NSG via:  
```az network nsg list -o table```

Creation of a Network Interface:  
```az network nic create --name "DemoNIC-Aimal" --resource-group "DemoRS-Aimal" --vnet-name "DemoVNet-Aimal" --subnet "DemoSubNet-Aimal" --public-ip-address "DemoPublicIP-Aimal" --network-security-group "DemoNSG-Aimal"```

List all available NIC via:  
```az network nic list -o table```

To create a VM, you need to know what image needs to go on it. List all available images by:    
```az vm image list -o table```

Creation of a VM:  
```az vm create --name "DemoVM-Aimal" --resource-group "DemoRS-Aimal" --image "Win2008R2SP1" --admin-username "AimalKhan" --admin-password ""```

List all available VMs via:  
```az vm list -o table```

List the public IP address of a VM via:  
```az vm list-ip-addresses --name "DemoVM-Aimal"```

Finally, open a port to connect to it:  
```az vm open-port --port 80 --name "DemoVM-Aimal" --resource-group "DemoRS-Aimal"```

***Optional: Connect to your VM via:***  
```mstsc /v:publicIpAddress```

***Clean Up**
Delete a resource group via:  
```az group delete --name "DemoRS-Aimal"```

