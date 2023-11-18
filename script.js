const errorElement = document.getElementById('error')


document.addEventListener('submit', function (event) {
    event.preventDefault()
    let messages = []
    var y = document.getElementById('input-y').value
    if (!validForm(y)) {
        messages.push('Невалидное поле Y')
    }

    if (messages.length > 0) {
        event.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
    else {
        errorElement.innerText = ""
    }
})

function validForm(y) {
    const regex = /^-?[0-9](\.[0-9]+)?$/
    if ((y >= 3 || y <= -3) || (!regex.test(y))) {
        return false;
    }
    else {
        return true;
    }
}
$(document).ready(function() {
    restoreDataFromLocalStorage();
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", function() {
        var y = document.getElementById('input-y').value
        var x = document.querySelector('input[name="x"]:checked').value
        var r = document.querySelector('input[name="R"]:checked').value
        if (!validForm(y)) {
            return;
        }
        var formData = {
            x: x,
            y: y,
            r: r
        };
        $.ajax({
            type: "POST",
            url: "server.php",
            data: formData,
            success: function(response) {
                $("#resultTable tbody").append(response);
                saveDataToLocalStorage();
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "server.php", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert('Запрос успешно выполнен');
            } else if (xhr.readyState == 4) {
                alert('Произошла ошибка при выполнении запроса');
            }
        }
        xhr.send(JSON.stringify(formData));

    });


    // Сохраняем данные в localStorage
    function saveDataToLocalStorage() {
        var tableData = [];

        $("#resultTable tbody tr").each(function() {
            var rowData = {
                x: $(this).find("td:eq(0)").text(),
                y: $(this).find("td:eq(1)").text(),
                r: $(this).find("td:eq(2)").text(),
                result: $(this).find("td:eq(3)").text(),
                executionTime: $(this).find("td:eq(4)").text(),
                currentTime: $(this).find("td:eq(5)").text()
            };
            tableData.push(rowData);
        });
    
        localStorage.setItem("tableData", JSON.stringify(tableData));
    }


    // Восстанавливаем данные из localStorage
    function restoreDataFromLocalStorage() {
        var storedData = localStorage.getItem("tableData");

        if (storedData) {
            var tableData = JSON.parse(storedData);

            $("#resultTable tbody").empty();

            $.each(tableData, function(index, rowData) {
                $("#resultTable tbody").append(
                    "<tr><td>" + rowData.x + "</td><td>" + rowData.y + "</td><td>" + rowData.r + "</td><td>" +
                    rowData.result + "</td><td>" + rowData.executionTime + "</td><td>" + rowData.currentTime + "</td></tr>"
                );
            });
        }
    }


    $("#clearTable").click(function() {
        localStorage.removeItem("tableData");
        $("#resultTable tbody").empty();
    });
});