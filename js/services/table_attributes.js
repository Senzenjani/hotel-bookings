
export function setTableAttributes(table) { //Sets the the attributes of datatable
    $(table).DataTable({
        "destory": true,
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false,
        "paging": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "buttons": ["copy", "csv", "excel", "pdf"]
    });
}
