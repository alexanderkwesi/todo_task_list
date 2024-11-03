<script>
$("#check{{id}} , #task-list").on("click", function () {
    if ($(this).on("click")) {
      $(this).addClass("strikethrough").prop("disabled", true);
    }
  });

  $("#check{{id}}").change(function () {
    if ($(this).is(":checked")) {
      localStorage.setItem("checkboxState", "checked");
      localStorage.setItem(
        "task-list-State",
        $("#text-value{{id}}").addClass("strikethrough")
      );
    } else {
      localStorage.setItem("checkboxState", "unchecked");
      localStorage.setItem(
        "task-list-State",
        $("#text-value{{id}}").addClass("text-value")
      );
    }
  });
</script>

<script>

  if(localStorage.getItem('checkboxState') == 'checked')
  {
    $('#check{{id}}').each(function(){

      $(this).prop('checked', true);
        
   });

  }
 

  if(localStorage.getItem('task-list-State')!= null)
  {
    $('#text-value{{id}}').each(function(){
        $(this).removeClass('text-value').addClass('strikethrough');
   });
  }
</script>