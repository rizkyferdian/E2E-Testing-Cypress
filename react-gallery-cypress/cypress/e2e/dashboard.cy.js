describe('Dashboard page test case', () => {
    it("Do Login with Correct Values", () => {
        cy.visit('http://localhost:3000');

        const email = cy.get("input[name='email']");
        email.type("user@react.test")

        const password = cy.get("input[name='password']");
        password.type("password")

        const button = cy.get("button");
        button.click()

        cy.url().should("eq", "http://localhost:3000/dashboard")
    })

    it('Found no post for the first time', () => {
        cy.visit('http://localhost:3000/dashboard')
        cy.contains("Found 0 photos")
    });

    it('Contains image url and description input and upload button', () => {
        //check image
        cy.visit('http://localhost:3000/dashboard')

        const image = cy.get("input[name='image']");
        image.should("be.visible")
        image.should("have.attr", "type", "url")
        image.should("have.attr", "required", "required")
        image.should("have.attr", "placeholder", "Image URL")

        const description = cy.get("input[name='desc']");
        description.should("be.visible")
        description.should("have.attr", "type", "text")
        description.should("have.attr", "required", "required")
        description.should("have.attr", "placeholder", "What's on your mind?")

        const button = cy.get("button");
        button.should("be.visible")
        button.contains("Publish!")
        button.should("have.css", "background-color", "rgb(79, 70, 229)")
        button.should("have.css", "color", "rgb(255, 255, 255)")
    });

    it("Upload some photos", () => {
        cy.visit('http://localhost:3000/dashboard')
        const photos = [
            {
                imageValue: "https://picsum.photos/id/237/200/300",
                descriptionValue: "Image 1: Lorem Ipsum"
            },

            {
                imageValue: "https://picsum.photos/id/238/200/300",
                descriptionValue: "Image 2: Lorem Ipsum"
            },
        ]

        photos.forEach((photo) => {
            const image = cy.get("input[name='image']");
            image.type(photo.imageValue)

            const description = cy.get("input[name='desc']");
            description.type(photo.descriptionValue)

            const button = cy.get("button");
            button.click()

            //check uploaded image is exist
            cy.get("img").should("have.attr", "src", photo.imageValue)
            cy.contains(photo.descriptionValue)
        })
    })

})