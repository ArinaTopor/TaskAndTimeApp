const pathToIcons: string = '../../../../../assets/icons/';

/**
 * Function return iconPath for loading
 */
async function loadIcon(iconPath: string): Promise<string> {
    return iconPath;
}

/**
 * Asynchronously initializes data for the navigation list
 *
 * This function loads the paths to icons for each item in navbarDataList
 * and updates the icon property of each item using the loadIcon function
 */
export async function initIconNavbar(icons:string[], navbarData:any): Promise<void> {
    for (let i:number = 0; i < navbarData.length; i++) {
        navbarData[i].icon = await loadIcon(pathToIcons + icons[i]);
    }
}

/**
 * Asynchronously initializes data for the navigation list
 *
 * This function loads the paths to icons for each item in navbarDataList
 * and updates the icon property of each item using the loadIcon function
 */
export async function initIconNavbarContent(icons:string[], navbarData:any): Promise<void> {
    for (let i:number = 0; i < navbarData.length; i++) {
        navbarData[i].iconContent = await loadIcon(pathToIcons + icons[i]);

    }
}
