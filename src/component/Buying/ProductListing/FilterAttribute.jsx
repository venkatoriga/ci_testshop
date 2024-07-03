export function filterAttribute(IndustryCheckBoxValue,CategoryCheckBoxValue) {
    const SparefilterConfigurations = [
      { title: "Industry", attribute: "categories.lvl0", filterType: "Industry" },
      { title: "Category", attribute: "categories.lvl1", filterType: "Category"},
      { title: "Sub-Category", attribute: "categories.lvl2", filterType: "Sub-Category" },
      { title: "Category-Type", attribute: "categories.lvl3", filterType: "Category-Type" },
      { title: "Brands", attribute: "brands", filterType: "Brands" },
      { title: "Price", attribute: "grossPrice", filterType: "Price" },
     
    ];
    
    const filterConfigurations = [
        
      { title: "Industry", attribute: "categories.lvl0", filterType: "industry" },
      { title: "Category", attribute: "categories.lvl1", filterType: "category" },
      { title: "Brands", attribute: "attributes.Brands", filterType: "brand" },
      { title: "Model", attribute: "attributes.Model", filterType: "Model" },
      { title: "Year", attribute: "mfgYear", filterType: "Year" },
      { title: "Price", attribute: "grossPrice", filterType: "Price" },
      { title: "Location", attribute: "attributes.Machine Location", filterType: "Machine Location" },
    ];
    const isHealthcareChecked = IndustryCheckBoxValue.includes('HealthCare');
    
    // Check if 'MSME' is in the CategoryCheckBoxValue array
    const isMSMEChecked = IndustryCheckBoxValue.includes('MSME');

    const isMSMEMachine = CategoryCheckBoxValue.some(value => value.includes('MSME >'));
    const isHealthcareMachine = CategoryCheckBoxValue.some(value => value.includes('HealthCare >'));
    // MACHINE-Types -Attribute Filter
    const isCNCVMCMACHINE = CategoryCheckBoxValue.some(value => value.includes('CNC VMC'));
    const isCNCTurningMACHINE = CategoryCheckBoxValue.some(value => value.includes('CNC Turning Centre'));
    const isCNCLatheMACHINE = CategoryCheckBoxValue.some(value => value.includes('CNC Lathe'));
    const isHMCMachine = CategoryCheckBoxValue.some(value => value.includes('HMC'));
    const isUMCMACHINE = CategoryCheckBoxValue.some(value => value.includes('UMC'));
    const isBoringMillsMACHINE = CategoryCheckBoxValue.some(value => value.includes('Boring Mills'));
    const isGrinderMachinesMACHINE = CategoryCheckBoxValue.some(value => value.includes('Grinder Machines'));

    if (isHealthcareMachine) {
        const subCategoryObject = { title: "SUB CATEGORY", attribute: "categories.lvl2", filterType: "SUB CATEGORY" };
        // Insert at position 2 (index 1)
        filterConfigurations.splice(2, 0, subCategoryObject);
    }
 

    // if ((isHealthcareChecked || isHealthcareMachine) && !isMSMEChecked) {
    //     filterConfigurations.push([]);
    // }
    if (isCNCVMCMACHINE) {
        filterConfigurations.push(
            { title: "Controller", attribute: "attributes.Controller", filterType: "Controller"},
            { title: "X AXIS (mm)", attribute: "xAxis", filterType: "XAXIS"},
            { title: "Y AXIS (mm)", attribute: "yAxis", filterType: "YAXIS"},
            { title: "Z AXIS (mm)", attribute: "zAxis", filterType: "ZAXIS"},
            { title: "Max Spindle Speed (RPM)", attribute: "spindlespeed", filterType: "spindlespeed"},
            { title: "Spindle Taper", attribute: "spindletaper", filterType: "spindletaper"},
        );
    }
    else if (isCNCTurningMACHINE) {
        filterConfigurations.push(
            { title: "Controller", attribute: "attributes.Controller", filterType: "Controller" },
            { title: "Tailstock", attribute: "tailstock", filterType: "tailstock"},
        );
    }
    else if (isCNCLatheMACHINE) {
        filterConfigurations.push(
            { title: "Controller", attribute: "attributes.Controller", filterType: "Controller"},
            { title: "Bar Capacity", attribute: "barcapacity", filterType: "barcapacity"},
            { title: "Chuck Size", attribute: "chucksize", filterType: "chucksize"},
            { title: "Max Turning Length", attribute: "maxturninglength", filterType: "maxturninglength"},
            { title: "Swing Over Bed", attribute: "swingoverbed", filterType: "swingoverbed"},
            { title: "Swing Over Cross-Slide", attribute: "swingovercrossslide", filterType: "swingovercrossslide"},
            { title: "Sub Spindle", attribute: "subSpindle", filterType: "subSpindle"},
            { title: "Live Tooling", attribute: "liveTooling", filterType: "liveTooling"},
            { title: "Tailstock", attribute: "tailstock", filterType: "tailstock"},
        );
    }
  
  
    return { SparefilterConfigurations, filterConfigurations };
  }