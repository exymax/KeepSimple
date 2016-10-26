app.service("noteService", function(dataService) {
    let curNote = null;
    this.openEditor = function(note, edit) {
        curNote = note;
        edit.name  = note.name;
        edit.content = note.content;
    }

    this.closeEditor = function(edit) {
        edit.name = "";
        edit.content = "";
        curNote = null;
    }

    this.saveNote = function(edit) {
        if(curNote !== null) {
            curNote.name = edit.name;
            curNote.content = edit.content;
        }
        else alert("ex: note is not defined");
        this.closeEditor(edit);
    }

    this.getNotes = function(){
        return dataService.getData();
    }

    this.getNoteModel = function(name, content, image, imageUrl) {
        return {
            isImaged: !!image,
            imageUrl: imageUrl,
            background: '#fff',
            colorChangerActive: false,
            name: name,
            content: content
        };
    }

    this.getImageNoteModel = function() {
        return {
            isImage: true,
            url: ""
        };
    }

    this.saveToStorage = function(note) {

    }

});
