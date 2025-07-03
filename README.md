# Next.js Business Workflow Builder

A multi-step workflow builder interface built with Next.js, TypeScript, and SCSS. This application allows users to create custom business workflows through an intuitive step-by-step process.

## Features

- **Multi-step workflow creation** with 5 distinct steps
- **State persistence** using localStorage for "Save and Finish Later" functionality
- **Real-time validation** with disabled navigation until required selections are made
- **Responsive design** with modern UI components
- **TypeScript support** for type safety
- **SCSS styling** with component-based architecture

## Requirements

Before running this application, ensure you have the following installed:

### System Requirements
- **Node.js**: v20.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: Latest version for cloning the repository

### Optional but Recommended
- **VS Code**: For the best development experience
- **Node Version Manager (nvm)**: To manage Node.js versions

### Check Your Installation
Verify your setup by running these commands:

```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show v9.x.x or higher
git --version     # Should show installed version
```

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nextjs-business-flow
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14+
- React 18+
- TypeScript
- SASS/SCSS
- Material-UI Icons

### 3. Start the Development Server

```bash
npm run dev
```

### 4. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

The page will automatically reload when you make changes to the code.

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Starts the development server on [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `.next` folder

### `npm run start`
Runs the built app in production mode

### `npm run lint`
Runs the linter to check for code quality issues

### `npm run type-check`
Runs TypeScript compiler to check for type errors

## Project Structure

```
nextjs-business-flow/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main workflow page
├── components/            # React components
│   ├── ProgressStepper.tsx
│   └── steps/             # Workflow step components
│       ├── Criteria01.tsx
│       ├── Criteria02.tsx
│       ├── Trigger01.tsx
│       ├── Action01.tsx
│       └── Review01.tsx
├── scss/                  # SCSS styling
│   ├── global.scss
│   └── components/        # Component-specific styles
└── public/               # Static assets
```

## How to Use the Application

### Workflow Creation Process

1. **Step 1 - Choose Workflow Base**: Select the foundation for your workflow (Company, Record, Website, etc.)

2. **Step 2 - Select Record Types**: Choose which record types the workflow should apply to

3. **Step 3 - Define Trigger**: Set what event should trigger the workflow (Record created/updated)

4. **Step 4 - Choose Actions**: Select what actions should happen when triggered (Add flag, Send email, etc.)

5. **Step 5 - Review**: Review your workflow configuration before completion

### Key Features

- **Navigation**: Use "Next" and "Back" buttons to move between steps
- **Validation**: "Next" button is disabled until required selections are made
- **Save Draft**: Use "Save and Finish Later" to preserve your progress
- **State Persistence**: Your selections are automatically saved in browser storage

## Development

### Adding New Steps

1. Create a new component in `components/steps/`
2. Add the step to the step mapping in `page.tsx`
3. Update validation logic for the new step
4. Add corresponding SCSS styles

### Styling Guidelines

- Use SCSS with BEM methodology
- Component styles go in `scss/components/`
- Follow existing naming conventions
- Use CSS custom properties for consistent theming

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
npx kill-port 3000
# or
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run type-check
```

### Browser Compatibility

This application supports:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- **Next.js 14**: React framework with app directory
- **React 18**: UI library with hooks
- **TypeScript**: Type-safe JavaScript
- **SCSS**: Enhanced CSS with variables and nesting
- **Material-UI Icons**: Icon components
- **localStorage**: Client-side data persistence

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing [GitHub Issues](../../issues)
3. Create a new issue with detailed information about your problem

---

Built with ❤️ using Next.js and TypeScript