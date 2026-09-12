describe("Task List", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage("task-list-items");
    cy.reload();
  });

  it("menampilkan empty state saat belum ada task", () => {
    cy.get('[data-cy="empty-state"]')
      .should("be.visible")
      .and("contain", "Belum ada task");
    cy.get('[data-cy="active-count"]').should("have.text", "0");
    cy.get('[data-cy="completed-count"]').should("have.text", "0");
  });

  it("menampilkan validasi saat input kosong", () => {
    cy.get('[data-cy="add-task"]').click();
    cy.get('[data-cy="validation-message"]')
      .should("be.visible")
      .and("contain", "Nama task wajib diisi");
    cy.get('[data-cy="task-item"]').should("not.exist");
  });

  it("menambahkan task dan merapikan spasi input", () => {
    cy.get('[data-cy="task-input"]').type("  Review laporan  ");
    cy.get('[data-cy="add-task"]').click();

    cy.get('[data-cy="task-item"]').should("have.length", 1);
    cy.get('[data-cy="task-item"] .task-text').should("have.text", "Review laporan");
    cy.get('[data-cy="active-count"]').should("have.text", "1");
    cy.get('[data-cy="task-input"]').should("have.value", "");
  });

  it("mengubah task menjadi selesai", () => {
    cy.get('[data-cy="task-input"]').type("Tutup laporan");
    cy.get('[data-cy="add-task"]').click();
    cy.get('[data-cy="task-checkbox"]').check();

    cy.get('[data-cy="task-item"]').should("have.class", "is-completed");
    cy.get('[data-cy="active-count"]').should("have.text", "0");
    cy.get('[data-cy="completed-count"]').should("have.text", "1");
  });

  it("mempertahankan task setelah refresh dan dapat menghapusnya", () => {
    cy.get('[data-cy="task-input"]').type("Task persisten");
    cy.get('[data-cy="add-task"]').click();
    cy.reload();

    cy.get('[data-cy="task-item"] .task-text').should("have.text", "Task persisten");
    cy.get('[data-cy="delete-task"]').click();
    cy.get('[data-cy="task-item"]').should("not.exist");
    cy.get('[data-cy="empty-state"]').should("be.visible");
  });
});
