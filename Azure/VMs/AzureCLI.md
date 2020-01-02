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