document.addEventListener('DOMContentLoaded', function () {
    var notes;

    refreshNotes();

    window.addNote = function () {
        var noteInput = document.getElementById('noteInput');
        var note = noteInput.value;

        if (note.trim() !== '') {
            fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ note: note }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                refreshNotes();
            })
            .catch(error => {
                console.error('Error adding note:', error);
            });
        }

        noteInput.value = '';
    };

    window.deleteNote = function (index) {
        fetch(`/api/notes/${index}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            refreshNotes();
        })
        .catch(error => {
            console.error('Error deleting note:', error);
        });
    };

    function refreshNotes() {
        fetch('/api/notes')
        .then(response => response.json())
        .then(data => {
            notes = data;
            var noteList = document.getElementById('noteList');
            noteList.innerHTML = '';
    
            for (var i = 0; i < data.length; i++) {
                var listItem = document.createElement('li');
                listItem.classList.add('note-item');
    
                var noteContainer = document.createElement('div');
                noteContainer.classList.add('note-container');
                noteContainer.innerHTML = data[i].replace(/\n/g, '<br>'); // Replace line breaks with <br> tags
    
                var deleteContainer = document.createElement('div');
                deleteContainer.classList.add('delete-container');
    
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('btn', 'btn-danger', 'delete-btn');
                deleteButton.onclick = function (i) {
                    return function () {
                        deleteNote(i);
                    };
                }(i);
    
                deleteContainer.appendChild(deleteButton);
    
                listItem.appendChild(noteContainer);
                listItem.appendChild(deleteContainer);
    
                noteList.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
        });
    }
    
});
