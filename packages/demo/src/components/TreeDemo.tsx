import { Tree, TreeNode } from '@acronis-platform/shadcn-uikit/react'
import { Folder, File, FileText, Image, Music, Video, Code } from 'lucide-react'

export function TreeDemo() {
  const fileSystemData: TreeNode[] = [
    {
      id: '1',
      label: 'Documents',
      icon: <Folder className="h-4 w-4 text-blue-500" />,
      children: [
        {
          id: '1-1',
          label: 'Work',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: '1-1-1',
              label: 'Project.docx',
              icon: <FileText className="h-4 w-4 text-gray-500" />,
            },
            {
              id: '1-1-2',
              label: 'Report.pdf',
              icon: <File className="h-4 w-4 text-red-500" />,
            },
          ],
        },
        {
          id: '1-2',
          label: 'Personal',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: '1-2-1',
              label: 'Resume.pdf',
              icon: <File className="h-4 w-4 text-red-500" />,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      label: 'Pictures',
      icon: <Folder className="h-4 w-4 text-blue-500" />,
      children: [
        {
          id: '2-1',
          label: 'Vacation',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: '2-1-1',
              label: 'beach.jpg',
              icon: <Image className="h-4 w-4 text-green-500" />,
            },
            {
              id: '2-1-2',
              label: 'sunset.jpg',
              icon: <Image className="h-4 w-4 text-green-500" />,
            },
          ],
        },
        {
          id: '2-2',
          label: 'Family',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: '2-2-1',
              label: 'portrait.jpg',
              icon: <Image className="h-4 w-4 text-green-500" />,
            },
          ],
        },
      ],
    },
    {
      id: '3',
      label: 'Music',
      icon: <Folder className="h-4 w-4 text-blue-500" />,
      children: [
        {
          id: '3-1',
          label: 'Favorites',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: '3-1-1',
              label: 'song1.mp3',
              icon: <Music className="h-4 w-4 text-purple-500" />,
            },
            {
              id: '3-1-2',
              label: 'song2.mp3',
              icon: <Music className="h-4 w-4 text-purple-500" />,
            },
          ],
        },
      ],
    },
  ]

  const projectData: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      icon: <Folder className="h-4 w-4 text-blue-500" />,
      children: [
        {
          id: 'components',
          label: 'components',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: 'button.tsx',
              label: 'Button.tsx',
              icon: <Code className="h-4 w-4 text-blue-400" />,
            },
            {
              id: 'input.tsx',
              label: 'Input.tsx',
              icon: <Code className="h-4 w-4 text-blue-400" />,
            },
          ],
        },
        {
          id: 'utils',
          label: 'utils',
          icon: <Folder className="h-4 w-4 text-blue-500" />,
          children: [
            {
              id: 'helpers.ts',
              label: 'helpers.ts',
              icon: <Code className="h-4 w-4 text-blue-400" />,
            },
          ],
        },
        {
          id: 'app.tsx',
          label: 'App.tsx',
          icon: <Code className="h-4 w-4 text-blue-400" />,
        },
      ],
    },
    {
      id: 'public',
      label: 'public',
      icon: <Folder className="h-4 w-4 text-blue-500" />,
      children: [
        {
          id: 'index.html',
          label: 'index.html',
          icon: <FileText className="h-4 w-4 text-orange-500" />,
        },
      ],
    },
    {
      id: 'package.json',
      label: 'package.json',
      icon: <FileText className="h-4 w-4 text-green-600" />,
    },
  ]

  const organizationData: TreeNode[] = [
    {
      id: 'company',
      label: 'Company',
      children: [
        {
          id: 'engineering',
          label: 'Engineering',
          children: [
            {
              id: 'frontend',
              label: 'Frontend Team',
              children: [
                { id: 'john', label: 'John Doe' },
                { id: 'jane', label: 'Jane Smith' },
              ],
            },
            {
              id: 'backend',
              label: 'Backend Team',
              children: [
                { id: 'bob', label: 'Bob Johnson' },
                { id: 'alice', label: 'Alice Williams' },
              ],
            },
          ],
        },
        {
          id: 'design',
          label: 'Design',
          children: [
            { id: 'sarah', label: 'Sarah Brown' },
            { id: 'mike', label: 'Mike Davis' },
          ],
        },
        {
          id: 'marketing',
          label: 'Marketing',
          children: [
            { id: 'emma', label: 'Emma Wilson' },
            { id: 'david', label: 'David Martinez' },
          ],
        },
      ],
    },
  ]

  return (
    <section className="demo-section">
      <h2>Tree Component</h2>
      <p className="demo-description">
        A hierarchical tree structure for displaying nested data with expand/collapse functionality.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Tree</h3>
          <p className="text-sm text-gray-600 mb-4">
            Simple tree structure without icons or checkboxes.
          </p>
          <Tree data={organizationData} defaultExpanded={['company']} />
        </div>

        <div className="demo-item">
          <h3>Tree with Icons</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tree structure with custom icons for each node.
          </p>
          <Tree data={fileSystemData} showIcon defaultExpanded={['1', '2']} />
        </div>

        <div className="demo-item">
          <h3>Tree with Checkboxes</h3>
          <p className="text-sm text-gray-600 mb-4">Tree with checkboxes for multi-selection.</p>
          <Tree
            data={organizationData}
            showCheckbox
            defaultExpanded={['company', 'engineering']}
            defaultChecked={['john', 'jane']}
          />
        </div>

        <div className="demo-item">
          <h3>Tree with Icons and Checkboxes</h3>
          <p className="text-sm text-gray-600 mb-4">
            Full-featured tree with both icons and checkboxes.
          </p>
          <Tree data={fileSystemData} showIcon showCheckbox defaultExpanded={['1', '1-1']} />
        </div>

        <div className="demo-item">
          <h3>File System Explorer</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tree representing a file system with folders and files.
          </p>
          <Tree
            data={fileSystemData}
            showIcon
            defaultExpanded={['1', '2', '3']}
            onNodeSelect={(id) => console.log('Selected:', id)}
          />
        </div>

        <div className="demo-item">
          <h3>Project Structure</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tree showing a typical project folder structure.
          </p>
          <Tree
            data={projectData}
            showIcon
            defaultExpanded={['src', 'components']}
            onNodeToggle={(id) => console.log('Toggled:', id)}
          />
        </div>

        <div className="demo-item">
          <h3>Organization Hierarchy</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tree displaying company organizational structure.
          </p>
          <Tree
            data={organizationData}
            defaultExpanded={['company', 'engineering', 'design']}
            onNodeSelect={(id) => console.log('Selected employee:', id)}
          />
        </div>

        <div className="demo-item">
          <h3>Controlled Tree</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tree with event handlers for expand, select, and check actions.
          </p>
          <Tree
            data={projectData}
            showIcon
            showCheckbox
            defaultExpanded={['src']}
            onNodeToggle={(id) => console.log('Node toggled:', id)}
            onNodeSelect={(id) => console.log('Node selected:', id)}
            onNodeCheck={(id, checked) => console.log('Node checked:', id, checked)}
          />
        </div>

        <div className="demo-item">
          <h3>Deep Nesting</h3>
          <p className="text-sm text-gray-600 mb-4">Tree with multiple levels of nesting.</p>
          <Tree
            data={[
              {
                id: 'level1',
                label: 'Level 1',
                children: [
                  {
                    id: 'level2',
                    label: 'Level 2',
                    children: [
                      {
                        id: 'level3',
                        label: 'Level 3',
                        children: [
                          {
                            id: 'level4',
                            label: 'Level 4',
                            children: [
                              {
                                id: 'level5',
                                label: 'Level 5',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ]}
            defaultExpanded={['level1', 'level2', 'level3', 'level4']}
          />
        </div>

        <div className="demo-item">
          <h3>Mixed Content Tree</h3>
          <p className="text-sm text-gray-600 mb-4">
            Tree with various types of content and icons.
          </p>
          <Tree
            data={[
              {
                id: 'media',
                label: 'Media Files',
                icon: <Folder className="h-4 w-4 text-blue-500" />,
                children: [
                  {
                    id: 'videos',
                    label: 'Videos',
                    icon: <Folder className="h-4 w-4 text-blue-500" />,
                    children: [
                      {
                        id: 'video1',
                        label: 'tutorial.mp4',
                        icon: <Video className="h-4 w-4 text-red-500" />,
                      },
                      {
                        id: 'video2',
                        label: 'demo.mp4',
                        icon: <Video className="h-4 w-4 text-red-500" />,
                      },
                    ],
                  },
                  {
                    id: 'audio',
                    label: 'Audio',
                    icon: <Folder className="h-4 w-4 text-blue-500" />,
                    children: [
                      {
                        id: 'audio1',
                        label: 'podcast.mp3',
                        icon: <Music className="h-4 w-4 text-purple-500" />,
                      },
                    ],
                  },
                  {
                    id: 'images',
                    label: 'Images',
                    icon: <Folder className="h-4 w-4 text-blue-500" />,
                    children: [
                      {
                        id: 'img1',
                        label: 'logo.png',
                        icon: <Image className="h-4 w-4 text-green-500" />,
                      },
                      {
                        id: 'img2',
                        label: 'banner.jpg',
                        icon: <Image className="h-4 w-4 text-green-500" />,
                      },
                    ],
                  },
                ],
              },
            ]}
            showIcon
            showCheckbox
            defaultExpanded={['media', 'videos', 'images']}
          />
        </div>
      </div>
    </section>
  )
}
