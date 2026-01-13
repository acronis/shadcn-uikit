import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@acronis-platform/shadcn-uikit/react'
import { Card, CardContent } from '@acronis-platform/shadcn-uikit/react'
import { Button } from '@acronis-platform/shadcn-uikit/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="demo-section">
      <h2>Carousel Component</h2>
      <p className="demo-description">
        A carousel component for cycling through elements with navigation controls and indicators.
      </p>

      <div className="space-y-8">
        <div className="demo-item">
          <h3>Basic Carousel</h3>
          <p className="text-sm text-gray-600 mb-4">Simple carousel with navigation arrows.</p>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="demo-item">
          <h3>With Dot Indicators</h3>
          <p className="text-sm text-gray-600 mb-4">
            Carousel with navigation dots matching Figma design.
          </p>
          <div className="w-full max-w-xs mx-auto">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <span className="text-4xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => api?.scrollPrev()}
                disabled={!api?.canScrollPrev()}
                className="text-[hsl(var(--carousel-nav-text))] disabled:text-[hsl(var(--carousel-nav-text-disabled)/0.3)]"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-2 rounded-full transition-all ${
                      index + 1 === current
                        ? 'w-2 bg-[hsl(var(--carousel-dot-active))]'
                        : 'w-2 bg-[hsl(var(--carousel-dot)/0.3)]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => api?.scrollNext()}
                disabled={!api?.canScrollNext()}
                className="text-[hsl(var(--carousel-nav-text))] disabled:text-[hsl(var(--carousel-nav-text-disabled)/0.3)]"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="demo-item">
          <h3>Multiple Items Per View</h3>
          <p className="text-sm text-gray-600 mb-4">Show multiple slides at once.</p>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-2xl mx-auto"
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="demo-item">
          <h3>Image Gallery</h3>
          <p className="text-sm text-gray-600 mb-4">Carousel for displaying images.</p>
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-video items-center justify-center p-6 bg-gradient-to-br from-blue-100 to-blue-200">
                        <div className="text-center">
                          <div className="text-6xl mb-2">🖼️</div>
                          <p className="text-sm text-gray-600">Image {index + 1}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="demo-item">
          <h3>Testimonials Carousel</h3>
          <p className="text-sm text-gray-600 mb-4">
            Carousel for displaying customer testimonials.
          </p>
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {[
                {
                  quote: 'This product has completely transformed how we work!',
                  author: 'John Doe',
                  role: 'CEO, Company A',
                },
                {
                  quote: 'Outstanding support and amazing features.',
                  author: 'Jane Smith',
                  role: 'CTO, Company B',
                },
                {
                  quote: 'Best investment we made this year.',
                  author: 'Bob Johnson',
                  role: 'Manager, Company C',
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
                        <p className="text-lg italic mb-4">&quot;{testimonial.quote}&quot;</p>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="demo-item">
          <h3>Product Showcase</h3>
          <p className="text-sm text-gray-600 mb-4">
            Carousel for showcasing products with details.
          </p>
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {[
                { name: 'Product 1', price: '$99', emoji: '💻' },
                { name: 'Product 2', price: '$149', emoji: '📱' },
                { name: 'Product 3', price: '$199', emoji: '⌚' },
                { name: 'Product 4', price: '$299', emoji: '🎧' },
              ].map((product, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-8">
                        <div className="text-6xl mb-4">{product.emoji}</div>
                        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                        <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                        <Button className="w-full">Add to Cart</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="demo-item">
          <h3>Vertical Carousel</h3>
          <p className="text-sm text-gray-600 mb-4">Carousel with vertical orientation.</p>
          <Carousel
            opts={{
              align: 'start',
            }}
            orientation="vertical"
            className="w-full max-w-xs mx-auto"
          >
            <CarouselContent className="h-[400px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="pt-1 md:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{index + 1}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="demo-item">
          <h3>Auto-play Carousel</h3>
          <p className="text-sm text-gray-600 mb-4">Carousel that automatically advances slides.</p>
          <AutoplayCarousel />
        </div>

        <div className="demo-item">
          <h3>Figma-Style Navigation</h3>
          <p className="text-sm text-gray-600 mb-4">
            Carousel with navigation matching the Figma design exactly.
          </p>
          <FigmaStyleCarousel />
        </div>
      </div>
    </section>
  )
}

function AutoplayCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <Carousel setApi={setApi} className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 bg-gradient-to-br from-purple-100 to-pink-100">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function FigmaStyleCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const isFirst = current === 0
  const isLast = current === count - 1

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-5xl mb-2">📄</div>
                    <p className="text-sm text-gray-600">Step {index + 1}</p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-between">
        <button
          onClick={() => api?.scrollPrev()}
          disabled={isFirst}
          className={`text-sm font-semibold py-1 transition-colors ${
            isFirst
              ? 'text-[hsl(var(--carousel-nav-text-disabled)/0.3)] cursor-not-allowed'
              : 'text-[hsl(var(--carousel-nav-text))] hover:opacity-80'
          }`}
        >
          <ChevronLeft className="inline h-4 w-4" /> Prev
        </button>

        <div className="flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === current
                  ? 'bg-[hsl(var(--carousel-dot-active))]'
                  : 'bg-[hsl(var(--carousel-dot)/0.3)]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => api?.scrollNext()}
          disabled={isLast}
          className={`text-sm font-semibold py-1 transition-colors ${
            isLast
              ? 'text-[hsl(var(--carousel-nav-text-disabled)/0.3)] cursor-not-allowed'
              : 'text-[hsl(var(--carousel-nav-text))] hover:opacity-80'
          }`}
        >
          Next <ChevronRight className="inline h-4 w-4" />
        </button>
      </div>

      {isLast && (
        <div className="space-y-2">
          <Button className="w-full bg-[hsl(var(--carousel-button-bg))] text-[hsl(var(--carousel-button-text))] hover:opacity-90">
            Protect devices
          </Button>
          <Button variant="ghost" className="w-full text-[hsl(var(--carousel-nav-text))]">
            Go back
          </Button>
        </div>
      )}
    </div>
  )
}
