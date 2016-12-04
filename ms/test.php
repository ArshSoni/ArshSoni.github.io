<?php

  function test_data($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

  function stringExists($var, $string) {
    if (!strpos($var, $string)) {
      $var .= $string;
    }
    return $var;
  }
  
  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = test_data($_POST['name']);
    $email = test_data($_POST['email']);
    $occasion = test_data($_POST['occasion']);
    $telephone = test_data($_POST['telephone']);
    $message = test_data($_POST['message']);

    $fields = [
      $name, 
      $email, 
      $occasion,
      $telephone, 
      $message
    ];

    $generalRegex = "/^[a-zA-Z ]*$/";
    $phoneRegex = "^[0-9]*$";

    $allFieldsFull = false;
    $counter = 0;
    $numOfFields = count($fields);
    $errors = '';

    for($i = 0; $i < $numOfFields; $i++) {
      if (empty($fields[$i]) || $fields[$i] == '') {
        $allFieldsFull = false;
      } else {
        $allFieldsFull = true;
      }
    }


    $errorsArray = array();

    if ($allFieldsFull) {

      if (!preg_match($generalRegex, $name)
        || !preg_match($generalRegex, $occasion)) {
          
        if (!strpos($errors, 'Please enter characters only.')) {
          $errors .= 'Please enter characters only.';
        }
      }
      
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        if (!strpos($errors, 'Please enter a valid email.')) {
          $errors .= 'Please enter a valid email.';
        }
      }
      
      if (!preg_match($phoneRegex, $telephone)) {
        if (!strpos($errors, 'Please enter a valid phone number.')) {
          $errors .= 'Please enter a valid phone number.';
        }
      }
    } else {
      $errors = 'Please fill in all the fields';
    }


    if (!empty($errors)) {
      echo $errors;
    } else if (empty($errors)) {
      echo 'success';
    } else {
      echo 'fail';
    }

    // echo ($allFieldsFull == true) ? 'success' : 'fail';




  }
?> 