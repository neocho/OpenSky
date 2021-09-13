export const cutAddress = (address) => {
    if(address === undefined){
        return;
    }

    return address.substring(0, 4) + "..." + address.substring(address.length-4, address.length);
}