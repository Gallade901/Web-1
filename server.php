<?php
    $startTime = microtime();
    // print_r($_POST);
    $x = $_POST["x"];
    $y = $_POST["y"];
    $r = $_POST['r'];
    $arrayX = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    $arrayR = [1, 2, 3, 4, 5];
    
    // echo $r;
    // echo $r;
    // echo ($y < 3 && $y > -3  && in_array($x, $arrayX) && in_array($r, $arrayR));
    // echo 4;
    // echo ($y < 3 && $y > -3 && in_array($x, $arrayX) && in_array($r, $arrayR));
    
    function validateVariables($x, $y, $r, $arrayR, $arrayX) {
        if ($y < 3 && $y > -3 && in_array($x, $arrayX) && in_array($r, $arrayR)) {
            return true;
        }
        else {
            return false;
        }
    }
    
    function area1($x, $y, $r) {
        if (((($r) ** 2 >= $x ** 2 + $y ** 2) && $x >=0 && $y >= 0) ||
            ($x >= -$r && $y <= $r / 2 && $x <= 0 && $y >= 0) ||
            ($y >= -$x / 2 -$r / 2 && $x <= 0 && $y <= 0)) {
            return true;
        }
        else {
            return false;
        }
    }

    if (validateVariables($x, $y, $r, $arrayR, $arrayX)) {
        $result = "";
        if (area1($x, $y, $r)) {
            $result = "+";
        }
        else {
            $result = "-";
        }
        $executionTime = (microtime() - $startTime) * 1000;
        date_default_timezone_set('Europe/Moscow');
        echo '<tr>
        <td>' . $x . '</td>
        <td>' . $y . '</td>
        <td>' . $r . '</td>
        <td>'. $result . '</td>
        <td>' . number_format($executionTime, 3) . 'ms </td>
        <td>' .date("H:i:s",time()) . '</td>
        </tr>';
    }
    else {
        http_response_code(400);
        echo '<h5>Data is invalid</h5>';
    }
?>