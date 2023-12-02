function  getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-${color}" data-toggle="modal" 
            data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}