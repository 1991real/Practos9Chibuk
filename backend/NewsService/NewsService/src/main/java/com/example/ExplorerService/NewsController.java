package com.example.ExplorerService;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "News API", description = "Manage news with PostgreSQL")
public class NewsController {

    private final NewsRepository NewsRepository;

    @Operation(summary = "Get all news")
    @GetMapping
    public List<News> getAllNews() {
        log.info("Fetching all news");

        return NewsRepository.findAll();
    }

    @Operation(summary = "Add new news")
    @PostMapping
    public News createNew(@RequestBody News news) {
        log.info("Creating news: {}", news);
        return NewsRepository.save(news);
    }

    @Operation(summary = "Get news by ID")
    @GetMapping("/{id}")
    public News getNewById(@PathVariable Long id) {
        log.info("Fetching news by id: {}", id);
        return NewsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("New not found"));
    }

    @Operation(summary = "Delete news by ID")
    @DeleteMapping("/{id}")
    public String deleteNew(@PathVariable Long id) {
        log.info("Deleting news with id: {}", id);
        NewsRepository.deleteById(id);
        return "Deleted successfully";
    }
}
