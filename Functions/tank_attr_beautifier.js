function beautifyTankAttr(attr) {
    var beautifiedTankAttr = '';
    const trimmedAttr = attr.trim();

    if(!trimmedAttr.includes(' ')) {
        beautifiedTankAttr += attr.charAt(0).toUpperCase() + attr.substring(1).toLowerCase();
    }
    else {
        const tankAttrDissect = trimmedAttr.split(' ');
    
        tankAttrDissect.forEach(tankAttr => {
            beautifiedTankAttr += tankAttr.charAt(0).toUpperCase() + tankAttr.substring(1).toLowerCase() + ' ';
        });
    
        beautifiedTankAttr = beautifiedTankAttr.trim();
    }
    

    return beautifiedTankAttr;

}

module.exports = beautifyTankAttr;