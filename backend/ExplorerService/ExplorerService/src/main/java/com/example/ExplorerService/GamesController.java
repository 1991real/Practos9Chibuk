package com.example.ExplorerService;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Games API", description = "Manage games with PostgreSQL")
public class GamesController {

    private final GamesRepository newRepository;

    @Operation(summary = "Get all games")
    @GetMapping
    public List<Games> getAllGames() {
        log.info("Fetching all games");
        return newRepository.findAll();
    }

    @Operation(summary = "Add new game")
    @PostMapping
    public Games createNew(@RequestBody Games game) {
        log.info("Creating game: {}", game);
        return newRepository.save(game);
    }

    @Operation(summary = "Get game by ID")
    @GetMapping("/{id}")
    public Games getNewById(@PathVariable Long id) {
        log.info("Fetching game by id: {}", id);
        return newRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
    }

    @Operation(summary = "Delete game by ID")
    @DeleteMapping("/{id}")
    public String deleteNew(@PathVariable Long id) {
        log.info("Deleting game with id: {}", id);
        newRepository.deleteById(id);
        return "Deleted successfully";
    }
}
