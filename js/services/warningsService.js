app.service("warningsService", function() {
    this.messages = [];
    this.counter = 1;
    this.throw = (message) => {
        this.messages.push(this.counter+"."+message);
        this.counter++;
    }
});
