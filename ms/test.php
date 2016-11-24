<?php
  
  if ($_POST) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $occasion = $_POST['occasion'];
    $telephone = $_POST['telephone'];
    $message = $_POST['message'];

    $fields = [
      $name, 
      $email, 
      $occasion,
      $telephone, 
      $message
    ];

    $submit = false;
    for($i = 0; $i < count($fields); $i++) {
      if ($fields[$i] != '') {
        $submit = true;
      }
    }

    if ($submit == true) {
      echo 'email sent';
    }


  }
?> 