// The objective of this test is to verify that the calendar does not display events for days that are after the end of the current month.
    it('should not display events for days after the end of the current month', () => {
        const events = [
          { id: 1, title: 'Event 1', date: '2022-01-15', time: '10:00', description: 'Event 1 description', color: 'bg-red-500' },
          { id: 2, title: 'Event 2', date: '2022-02-01', time: '14:00', description: 'Event 2 description', color: 'bg-blue-500' },
          { id: 3, title: 'Event 3', date: '2022-02-28', time: '16:30', description: 'Event 3 description', color: 'bg-green-500' },
        ];
        const onEditEvent = jest.fn();
  
        const wrapper = month(<Calendar events={events} onEditEvent={onEditEvent} />);
  
        // Get the last day of the current month
        const today = new Date();
        const lastDayOfMonth = endOfMonth(today);
  
        // Check if any event is displayed for a day after the last day of the current month
        const eventsAfterEndOfMonth = wrapper.findWhere((node) => {
          if (node.key() === null) return false;
          const eventDate = new Date(events.find((event) => event.id === parseInt(node.key())).date);
          return eventDate > lastDayOfMonth;
        });
  
        expect(eventsAfterEndOfMonth).toHaveLength(0);
      });