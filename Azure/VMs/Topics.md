Main topics:

* Provisioning a resource group, vnet, subnet, a NSG, a public IP and a VM  
* Managed vs Unmanaged Disk (main difference? SSD vs HDD (variying in IOPs and Throughput))  
    * Disks are just vhd files  
    * Snapshots: Readonly full copy files of a managed disk (Not backup of a VM)  
    * Snapshots can be converted into images  
    * Snapshots are not generalized  
    * When a generalized image is created, it might not be available in another location/zone i.e. azwest etc., you might need to copy it first    

    Steps (sysprep - for windows):  
    * On the portal, create a snapshot of the managed disk  
    * Login into the VM, start -> run -> sysprep  
    * Run sysprep as run as admin  
    * Select default options: system out of box, Shutdown after options  

    * Once the VM's generalized, "Capture" an image of it. That image can then be used to spin up more VMs  
* Generalizing/Deprovisioning an Image (using sysprep/waagent - reseting service specific data: To fecilitate future deployments)  
    * Take backup of a VM first because generalization is permanent (and you might lose the existing data)  
* Azure DevTest Labs (Spinning up multiple VMs using a formula - This might be renamed as Azure Lab Services now)  
* Azure Policies are used to restrict actions i.e. Restricting users creating resources outside of a certain location. etc. Search for 'Policy' on the azure portal, it also has a list of build-in polices to choose from.



Questions:  
* Snapshots vs Capturing an image of a VM