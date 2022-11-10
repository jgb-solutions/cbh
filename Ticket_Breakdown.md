# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1 - Backend updates

We need to have a custom ID for agents that is unique across the database table. As a user of the system, when I create or update an agent information, I should be able to also send a custom ID.

To do that, a new database migration needs to be created with the `customAgentId` column of type string with max length of 64 characters. We choose string for more flexibility of character combination.

This task should take approximately 2 hours to be completed.


Acceptance criteria:
- A new `customAgentId` column is added to the Agents table (or collection if DB is NoSQL) that is required
- Existing relationships should still be the same, using the database internally generated ID for relationships
- Validate the new custom ID regarding specific format requirements before saving or updating the agent record
  - Throw or return a list of errors back to the client when the validation fails
- Update any unit and/or integration tests to take into account the new `customAgentId` column


### Ticket 2 - Frontend updates

We need a new form input to save and/or update the new `customAgentId` field. That new input field should be required and of type text. We may want to validate that input field according to certain format on the client side.

This task should take approximately 4 hours to be completed.

Acceptance criteria:
- A new  `customAgentId` input field of type text is required on create and update forms for agents
- That input may need to be validated again a certain format depending on the requirements
- When generating a new report by calling `generateReport`, the new `customAgentId` field needs to be available
- Update any unit and/or integration tests to take into account the new `customAgentId` column
