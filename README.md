> Current Stable Version: 1.0.3

# 🗓️ **Eventar: The Modern React Calendar Library**

**A powerful, customizable, and lightweight React calendar component with seamless event management.**

```jsx
// Your calendar, simplified!
<Eventar
  events={events}
  views={["day", "week", "month", "year"]}
  theme="light"
/>
```

---

## ✨ **Why Eventar?**

- 🗓️ **Multiple Calendar Views** – Switch between Day, Week, Month, and Year effortlessly.
- 🌈 **Light & Dark Mode** – Seamlessly adapt to user preferences.
- ⚡ **Blazing Fast Performance** – Optimized rendering for smooth navigation.
- 🎠 **Framer Motion Animations** – Modern and sleek transitions.
- 📱 **Fully Responsive** – Works flawlessly on all screen sizes.
- 🌟 **Event Filtering & Color Coding** – Categorize and highlight events.
- 🔒 **Type-Safe with TypeScript** – Reliable and developer-friendly.
- 🎉 **Customizable Event Display** – Use your own modals or components.
- 🛠️ **Resource Management** - Supports management of events based on resources
- 🌟 **Special Days Highlighting** – Easily mark and distinguish important dates.

---

## 🚀 **Installation**

```bash
npm install eventar
# or
yarn add eventar
# or
pnpm add eventar
```

---

## 📚 **Quick Start Guide**

```jsx
import { Eventar } from "eventar";
import "eventar/dist/eventar.css"; // Import the default styles

function App() {
  const events = [
    {
      id: "1",
      title: "Team Meeting",
      start: new Date("2024-03-15T10:00:00"),
      end: new Date("2024-03-15T11:00:00"),
      color: "blue",
    },
  ];

  return <Eventar events={events} views={["month", "week"]} theme="light" />;
}
```

---

## 🎨 **CSS Styling**

Using MUI v7 for styling

---

### **Theming**

You can switch between **light** and **dark** themes by passing the `theme` prop:

```jsx
<Eventar events={events} theme="dark" />
```

---

## 🎓 **API Reference**

### **`<Eventar>` Props**

| Prop                 | Required | Type                            | Default                 | Description                                                                 |
| -------------------- | -------- | ------------------------------- | ----------------------- | --------------------------------------------------------------------------- |
| `events`             | ✅       | `Array`                         | `[]`                    | Array of events to display                                                  |
| `views`              | ✅       | `Array`                         | `["day","month"]`       | Available views for the calendar                                            |
| `isLoading`          | ✅       | `boolean`                       | `false`                 | Show loading spinner while fetching events                                  |
| `error`              | ✅       | `string`                        | `null`                  | Error message to display in case of fetch error                             |
| `defaultView`        | ❌       | `string`                        | `"month"`               | Default visible view on calendar render                                     |
| `theme`              | ❌       | `string`                        | `"light"`               | Theme of the calendar, can be "light" or "dark"                             |
| `navigation`         | ❌       | `boolean`                       | `true`                  | Enable/disable navigation buttons                                           |
| `showPastDates`      | ❌       | `boolean`                       | `true`                  | Show/hide past dates in the calendar                                        |
| `yearRange`          | ❌       | `Array`                         | `["2024"]`              | Range of years to display in the Year view                                  |
| `spinnerComponent`   | ❌       | `SpinnerVariant`                | `SpinnerVariant.SQUARE` | Custom spinner component to display while loading                           |
| `customViewerModal`  | ❌       | `(event: Event) => JSX.Element` | `null`                  | Custom modal component to display event details                             |
| `defaultModalConfig` | ❌       | `DefaultModalConfig`            | `{}`                    | Default configuration for event modal, if customViewerModal is not provided |
| `showAgenda`         | ❌       | `boolean`                       | `true`                  | Show/hide agenda view in the calendar                                       |
| `resources`          | ❌       | `Array : Resource[]`            | `[]`                    | Array of resources (rooms, people, etc.)                                    |
| `showClock`          | ❌       | `boolean`                       | `false`                 | Display live clock with emoji indicator                                     |
| `specialDays`        | ❌       | `Array : SpecialDay[]`          | `[]`                    | Custom special days to highlight in the calendar                            |
| `startOfWeek`        | ❌       | `string:`                       | `Mon`                   | Display calendars starting on the week day                                  |

```typescript
interface Resource {
  id: string;
  name: string;
  type: string;
  description?: string;
}

interface SpecialDay {
  date: string;
  title: string;
  description: string;
  type: string;
}
```

---

## 📊 **Resource Management**

Eventar supports resource-based scheduling for managing rooms, equipment, etc.

```jsx
const resources = [
  {
    id: "room-1",
    name: "Conference Room A",
    type: "room",
    description: "Conference Room A",
  },
  {
    id: "room-2",
    name: "Meeting Room B",
    type: "room",
    description: "Meeting Room B",
  },
];

const events = [
  {
    id: "1",
    title: "Team Meeting",
    start: new Date("2024-03-15T10:00:00"),
    end: new Date("2024-03-15T11:00:00"),
    resourceId: "room-1",
    color: "blue",
  },
];

<Eventar
  events={events}
  isLoading={false}
  error={null}
  views={["day", "week", "month"]}
  theme="light"
  resources={resources}
/>;
```

## 🌟 **Special Days**

Eventar allows you to highlight special days in the calendar, such as holidays, birthdays, or any other significant dates. You can pass an array of `specialDays` to the `Eventar` component.

### **SpecialDay Interface**

```typescript
interface SpecialDay {
  date: string;
  title: string;
  description: string;
  type: string;
}
```

### **Usage Example**

```jsx
const specialDays = [
  {
    date: "2024-12-25",
    title: "Christmas",
    description: "Christmas Day",
    type: "holiday",
  },
  {
    date: "2024-01-01",
    title: "New Year's Day",
    description: "First day of the year",
    type: "holiday",
  },
];

<Eventar
  events={events}
  specialDays={specialDays}
  views={["month", "week"]}
  theme="light"
/>;
```

Special days will be highlighted in the calendar, making it easy to distinguish them from regular events.

---

## 🎨 **Customization**

### **`<CustomViewerModal>` Component**

- By default Eventar has 3 built-in custom modal components: `SimpleEventModal`, `CompactEventModal`, and `CardEventModal`. Import them from the `Modals` object so that you can use these components by passing in the `CustomViewerModal` prop, or create your own custom modal component.

```jsx
<Eventar
  events={events}
  customEventViewer={(event) => <Modals.Simple event={event} />}
/>

// or

<Eventar
  events={events}
  customEventViewer={(event) => <Modals.Compact event={event} />}
/>

// or

<Eventar
  events={events}
  customEventViewer={(event) => <Modals.Card event={event} />}
/>

// or

// Create your own custom modal component
<Eventar
  events={events}
  customEventViewer={(event) => (
    <div className="custom-event">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )}
```

## 📈 **Data Fetching Hooks**

Eventar provides custom hooks to fetch events and resources from an API.

### `useEvents` hook fetches events from an API and transforms the data to the required format.

```jsx
import { useEvents } from "Eventar";

function Calendar() {
  const { events, isLoading, error } = useEvents({
    endpoint: "your-api-endpoint",
    refactorData: (data) =>
      // Transform your API data to CalendarEvent[]
      data.map((item) => ({
        id: item.id,
        title: item.title,
        start: new Date(item.startTime),
        end: new Date(item.endTime),
      })),
  });

  return <Eventar events={events} isLoading={isLoading} error={error} />;
}
```

### `useResources` hook used to fetch resources from an API endpoint.

```jsx
import { useResources } from "Eventar";

function Calendar() {
  const { resources, error, isLoading } = useResources({
    endpoint: "your-api-endpoint",
    delay: 1000,
  });

  return (
    <Eventar
      events={events}
      resources={resources}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

---

## 🧩 Examples

**`Full Featured Calendar With Default Modal Config`**

```jsx
<Eventar
  events={events}
  navigation={true}
  views={["day", "week", "month", "year"]}
  defaultView="month"
  yearRange={["2024", "2025"]}
  showPastDates={false}
  theme="light"
  spinnerComponent={SpinnerVariant.BARS}
  defaultModalConfig={{
    showModalHeaderStrip: true,
    disableActionButton: false,
  }}
/>
```

**`Full Featured Calendar With Custom Modal Component`**

```jsx
<Eventar
  events={events}
  navigation={true}
  views={["day", "week", "month", "year"]}
  defaultView="month"
  yearRange={["2024", "2025"]}
  showPastDates={false}
  theme="light"
  spinnerComponent={SpinnerVariant.BARS}
  customViewerModal={(event) => (
    <div className="custom-event">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  )}
/>
```

**`Full Featured Calendar With Custom Inbuilt Modal Components`**

```jsx
<Eventar
  events={events}
  navigation={true}
  views={["day", "week", "month", "year"]}
  defaultView="month"
  yearRange={["2024", "2025"]}
  showPastDates={false}
  theme="light"
  spinnerComponent={SpinnerVariant.BARS}
  customViewerModal={(event) => <Modals.Compact event={event} />}
/>
```

---

## 📝 **License**

Licensed under MIT

---

## 🤝 **Contributing**

Got ideas for new features? Found a bug? PRs and issues are welcome! Check the [issues page](https://github.com/yasirmansoori/Eventar/issues).

---
